import { MikroORM } from '@mikro-orm/core';

import MikroConfig from '../mikro-orm.config';

(async () => {
  try {
    const orm = await MikroORM.init(MikroConfig);
    await orm.getMigrator().up();
  } catch (e) {
    throw new Error(e);
  }
})();
