export class RendererMock {
	public static instance(): any {
		let instance = jasmine.createSpyObj('Renderer', [
			'selectRootElement',
			'createElement',
			'createViewRoot',
			'createText',
			'setElementProperty',
			'setElementAttribute',
			'setText',
			'setBindingDebugInfo',
			'createTemplateAnchor',
			'projectNodes',
			'attachViewAfter',
			'detachView',
			'destroyView',
			'listen',
			'listenGlobal',
			'setElementClass',
			'setElementStyle',
			'invokeElementMethod',
			'animate']);

		return {
			renderComponent: () => {
				return instance;
			}
		};
	}
}

/*
For Renderer2:

const renderer2Mock = jasmine.createSpyObj('renderer2Mock', [
  'destroy',
  'createElement',
  'createComment',
  'createText',
  'destroyNode',
  'appendChild',
  'insertBefore',
  'removeChild',
  'selectRootElement',
  'parentNode',
  'nextSibling',
  'setAttribute',
  'removeAttribute',
  'addClass',
  'removeClass',
  'setStyle',
  'removeStyle',
  'setProperty',
  'setValue',
  'listen'
]);

const rootRendererMock =  {
  renderComponent: () => {
      return renderer2Mock;
  }
};
*/