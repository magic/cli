import is from '@magic/types'

export const clean = props => {
  if (is.empty(props.single)) {
    return props
  }

  props.single.map(s => {
    if (props.options[s] && is.array(props.options[s])) {
      props.options[s] = s.join(' ')
    }
  })

  return props
}
