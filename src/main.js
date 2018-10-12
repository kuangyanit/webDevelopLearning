import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


function formatComponentName(vm)
{
  if (vm.$root === vm) return 'root';
  var name = vm._isVue ? (vm.$options && vm.$options.name) || (vm.$options && vm.$options._componentTag) : vm.name;
  return (name ? 'component <' + name + '>' : 'anonymous component') + (vm._isVue && vm.$options && vm.$options.__file ? ' at ' + (vm.$options && vm.$options.__file) : '');

}

Vue.config.errorHandler = function(err, vm, info)
{
  var componentName = formatComponentName(vm);
  var propsData = vm.$options && vm.$options.propsData;
  fundebug.notifyError(err,
  {
      metaData:
      {
          componentName: componentName,
          propsData: propsData,
          info: info
      }
   });
};

Vue.config.warnHandler = function (msg, vm, trace) {
  // `trace` 是组件的继承关系追踪
  var componentName = formatComponentName(vm);
  var propsData = vm.$options && vm.$options.propsData;
  fundebug.notifyError(msg,
  {
      metaData:
      {
          componentName: componentName,
          propsData: propsData,
          trace: trace
      }
  });
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
