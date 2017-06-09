import Vue from 'vue'
import Alert from '@/components/Alert'

const AlertComponent = Vue.extend(Alert)

const showAlert = (propsData = {
  title: '',
  message: '',
  type: '',
  direction: '',
  duration: 1500,
  container: '.messages'
}) => {
  return new AlertComponent({
    el: document.createElement('div'),
    propsData
  })
}

export {
  showAlert
}
