import Step1 from '~/prog.svg'
import Step2 from '~/prog2.svg'
import Step3 from '~/prog3.svg'
export default function StepperIndicator({step}: {step: number}) {
    return <div className='w-20 h-2 mx-2'>
        {step === 0 && <Step1/>}
        {step === 1 && <Step2/>}
        {step === 2 && <Step3/>}
    </div>
}
