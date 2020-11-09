import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from 'src/app/rootReducer';
import { Button } from 'src/components/Button';
import ExchangeIcon from 'src/components/icons/exchange_white.svg';
import { MoneyValueInput } from 'src/components/input/MoneyValueInput';
import { RadioBox } from 'src/components/input/RadioBox';
import { Box } from 'src/components/layout/Box';
import { ScreenFrameWithFeed } from 'src/components/layout/ScreenFrameWithFeed';
import { MoneyValue } from 'src/components/MoneyValue';
import { Currency } from 'src/consts';
import { exchangeStarted } from 'src/features/exchange/exchangeSlice';
import { ExchangeTokenParams, validate } from 'src/features/exchange/exchangeToken';
import { Color } from 'src/styles/Color';
import { Stylesheet } from 'src/styles/types';
import { useWeiExchange } from 'src/utils/amount';
import { useCustomForm } from 'src/utils/useCustomForm';
import { useInputValidation } from 'src/utils/validation';

const initialValues: ExchangeTokenParams = {
  amount: 0,
  fromCurrency: Currency.cUSD,
}

export function ExchangeFormScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const staleBalances = useSelector((state: RootState) => state.wallet.balances);
  const {transaction: txn, toCELORate } = useSelector((state: RootState) => state.exchange);
  
  const onSubmit = async (values: ExchangeTokenParams) => {
    if(validateInputs()) return;

    await dispatch(exchangeStarted(values))
    navigate("/exchange-review");
  }

  const { 
    values, 
    touched, 
    handleChange, 
    handleBlur, 
    handleSubmit, 
    resetValues } = useCustomForm<ExchangeTokenParams, any>(txn ?? initialValues, onSubmit);

  const doValidation = useCallback(() => validate(values, staleBalances), [values, staleBalances]);
  const { inputErrors, validateInputs } = useInputValidation(touched, doValidation);

  const safeAmount = useMemo(() => { 
    const fVal = parseFloat(values.amount.toString());
    return isNaN(fVal) ? 0 : fVal;
   }, [values.amount]);

  const exchangeRate = useMemo(() => { return values.fromCurrency === Currency.cUSD ? toCELORate : (1/toCELORate); }, [values.fromCurrency]);
  const exchange = useWeiExchange(safeAmount, values.fromCurrency, exchangeRate, 0);

  //-- If the txn gets cleared out in the slice, need to reset it in the screen
  useEffect(() => {
    if(txn === null){
      resetValues(initialValues);
    }
  }, [txn]);

  return (
    <ScreenFrameWithFeed>
      <Box direction="column" styles={style.contentContainer}>
        
        <form onSubmit={handleSubmit}>
          <h1 css={style.title}>Make an Exchange</h1>

          <Box direction="row" align="center" styles={style.inputRow}>
            <label css={style.inputLabel}>Amount to Exchange</label>
            <MoneyValueInput name="amount" width={150} onChange={handleChange} value={values.amount.toString()} onBlur={handleBlur} {...inputErrors["amount"]} />
          </Box>
          <Box direction="row" align="center" styles={style.inputRow}>
            <label css={style.inputLabel}>Currency</label>
            <RadioBox tabIndex={0} label="cUSD" value={Currency.cUSD} name="fromCurrency" checked={values.fromCurrency === Currency.cUSD} onChange={handleChange} classes={{container: {minWidth: 52}}} />
            <RadioBox tabIndex={1} label="CELO" value={Currency.CELO} name="fromCurrency" checked={values.fromCurrency === Currency.CELO} onChange={handleChange} classes={{container: {minWidth: 52}}} />
          </Box>
          <Box direction="row" align="center" styles={style.inputRow}>
            <label css={style.inputLabel}>Current Rate</label>
            <MoneyValue amountInWei={exchange.props.weiBasis} currency={exchange.from.currency} baseFontSize={1.2}/>
            <span css={style.valueText}>to</span>
            <MoneyValue amountInWei={exchange.props.weiRate} currency={exchange.to.currency} baseFontSize={1.2}/>
          </Box>

          <Box direction="row" align="center" styles={style.inputRow}>
            <label css={style.inputLabel}>Output Amount</label>
            <MoneyValue amountInWei={exchange.to.weiAmount} currency={exchange.to.currency} baseFontSize={1.2}/>
          </Box>

          <Button type="submit" size="m" icon={ExchangeIcon}>Make Exchange</Button>
        </form>
      </Box>
    </ScreenFrameWithFeed>
  )
}

const style: Stylesheet = {
  contentContainer: {
    height: "100%",
    paddingLeft: 65,
    paddingTop: 30,
    maxWidth: 500,
    width: "100%",
  },
  title: {
    color: "#3488EC",
    fontWeight: 400,
    fontSize: 30,
    marginTop: 0,
    marginBottom: 20,
  },
  inputRow: {
    height: 48, 
    marginBottom: 30,
  },
  inputLabel: {
    fontWeight: 300,
    fontSize: 18,
    marginBottom: 8,
    width: 175,
    marginRight: 8,
  },
  valueText: {
    fontSize: 20,
    fontWeight: 400,
    color: Color.primaryGrey,
    margin: "0 8px",
  },
  outputText: {
    fontSize: 20,
    fontWeight: 400,
    color: Color.primaryBlack,
  },
}