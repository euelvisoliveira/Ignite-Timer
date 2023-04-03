import { HandPalm, Play } from 'phosphor-react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'
import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'
import { useContext } from 'react'
import { CyclesContext } from '../../Contexts/CyclesContext'

// controller => manter o tempo real o estado da informação que o usuário inseri na aplicação(input) dentro do estado(variável)
// uncontroller => busca a informação do input somente quando precisarmos dela(nao monitora o value em tempo real)
// register ( useForm) => e um método que ele vai adicionar um input no formulário

const newCycleFormsValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, ' o ciclo precisa ser de no mínimo 5 minutos')
    .max(60, ' o ciclo precisa ser de no máximo 60 minutos'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormsValidationSchema>

export function Home() {
  const { activeCycle, createNewCycle, InterruptCurrentCycle } =
    useContext(CyclesContext)
  // dentro do zodResolver eu preciso passar qual e o p meu schema de validação(forma que eu quero validar os dados do input)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormsValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  // esta função com esse nome vou chamar ela diretamente de um evento
  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data)
    reset()
  }

  const task = watch('task')
  const isSubmitDisable = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormProvider {...newCycleForm}>
          {/* spread => (...objeto) significa pega cada propriedade do objeto e passa como uma propriedade */}
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <StopCountdownButton onClick={InterruptCurrentCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisable} type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
