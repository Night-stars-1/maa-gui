interface DetailListToRecognize {
  msg: 'Task.Debug.ListToRecognize'
  detail: {
    pre_hit_task: string
    list: string[]
  }
}

interface DetailMissAll {
  msg: 'Task.Debug.MissAll'
  detail: {
    pre_hit_task: string
    list: string[]
  }
}

interface DetailRecognitionResult {
  msg: 'Task.Debug.RecognitionResult'
  detail: {
    recognition: {
      id: number
      hit: boolean
    }
    name: string
  }
}

interface OtherDebug {
  msg: `Other:${string}`
  detail: any
}

type DebugData = DetailListToRecognize | DetailMissAll | DetailRecognitionResult | OtherDebug
