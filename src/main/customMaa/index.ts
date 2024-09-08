import * as maa from '@nekosu/maa-node'
import eventSelect from './eventSelect'

function registerCustom(inst: maa.Instance) {
  eventSelect(inst)
  // inst.post_task('MyCustomRecTask')
  // inst.post_action('MyCustomRecTask')
  // inst.post_recognition('event_select')
}

export { registerCustom }
