import { ConfigurableModuleBuilder } from '@nestjs/common';

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN: HTTP_MODULE_OPTIONS,
} = new ConfigurableModuleBuilder<{
  baseUrl: string;
}>({
  // para que se cree idependientemnte si son parametros iguales al crearlo
  alwaysTransient: true,
})
  // .setClassMethodName('forRoot')
  // .setFactoryMethodName('resolve')
  .setExtras(
    {
      isGlobal: true,
    },
    (definition, extras) => ({
      ...definition,
      global: extras.isGlobal,
    }),
  )
  .build();
