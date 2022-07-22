import { migrationStrategyForRouteTemplates } from '../../../../../src/migration/ember-app/app/route-templates.js';
import { inputProject } from '../../../../fixtures/app-javascript.js';
import { assert, loadFixture, test } from '../../../../test-helpers.js';

const projectRoot = 'tmp/app-javascript';

test('migration | ember-app | app | route-templates > JavaScript', function () {
  loadFixture(projectRoot, inputProject);

  assert.deepStrictEqual(migrationStrategyForRouteTemplates(projectRoot), [
    ['app/application/template.hbs', 'app/templates/application.hbs'],
    ['app/form/template.hbs', 'app/templates/form.hbs'],
    ['app/index/template.hbs', 'app/templates/index.hbs'],
    ['app/product-details/template.hbs', 'app/templates/product-details.hbs'],
    ['app/products/product/template.hbs', 'app/templates/products/product.hbs'],
    ['app/products/template.hbs', 'app/templates/products.hbs'],
  ]);
});
