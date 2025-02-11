import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from 'src/app/rootReducer'
import { Button } from 'src/components/buttons/Button'
import { HelpText } from 'src/components/input/HelpText'
import { SelectInput } from 'src/components/input/SelectInput'
import { Box } from 'src/components/layout/Box'
import { modalStyles } from 'src/components/modal/modalStyles'
import { addTokenActions, addTokenSagaName, validate } from 'src/features/wallet/balances/addToken'
import { AddTokenParams } from 'src/features/wallet/types'
import { Color } from 'src/styles/Color'
import { Stylesheet } from 'src/styles/types'
import { getKnownErc20Tokens } from 'src/tokenList'
import { shortenAddress } from 'src/utils/addresses'
import { SagaStatus } from 'src/utils/saga'
import { useCustomForm } from 'src/utils/useCustomForm'
import { useSagaStatusNoModal } from 'src/utils/useSagaStatus'

const initialValues: AddTokenParams = {
  address: '',
}

export function AddTokenModal(props: { close: () => void }) {
  const dispatch = useDispatch()
  const balances = useSelector((state: RootState) => state.wallet.balances)

  const onSubmit = (values: AddTokenParams) => {
    dispatch(addTokenActions.trigger(values))
  }

  const validateForm = (values: AddTokenParams) => validate(values, balances)

  const { values, errors, handleChange, handleBlur, handleSubmit } = useCustomForm<AddTokenParams>(
    initialValues,
    onSubmit,
    validateForm
  )

  const sagaStatus = useSagaStatusNoModal(addTokenSagaName, props.close)
  const isLoading = sagaStatus === SagaStatus.Started
  const isFailure = sagaStatus === SagaStatus.Failure

  const selectOptions = useMemo(() => getSelectOptions(), [])

  return (
    <form onSubmit={handleSubmit}>
      <Box direction="column" align="center">
        <p css={style.p}>
          Any cERC-20 compatible tokens can be added.
          <br />
          Choose a token or enter the contract address.
        </p>
        <SelectInput
          name="address"
          autoComplete={true}
          width="22.5em"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.address}
          options={selectOptions}
          maxOptions={4}
          disabled={isLoading}
          placeholder="Token name or address"
          allowRawOption={true}
          {...errors['address']}
        />
        {isFailure && (
          <HelpText margin="0.8em 0 -1.8em 0">Unable to add token, please check address.</HelpText>
        )}
        <Box direction="row" align="center" margin="7em 0 0 0">
          <Button
            size="s"
            color={Color.primaryWhite}
            margin="0 1em"
            onClick={props.close}
            type="button"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button size="s" margin="0 1em" type="submit" disabled={isLoading}>
            Add
          </Button>
        </Box>
      </Box>
    </form>
  )
}

function getSelectOptions() {
  return getKnownErc20Tokens().map((t) => {
    const display = `${t.id} - ${shortenAddress(t.address, true)}`
    return {
      display,
      value: t.address,
    }
  })
}

const style: Stylesheet = {
  p: {
    ...modalStyles.p,
    margin: '0 0 1.5em 0',
  },
}
