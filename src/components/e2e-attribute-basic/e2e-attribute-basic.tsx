import { Component, Prop, } from '@stencil/core';

@Component({
  tag: 'e2e-attribute-basic'
})
export class AttributeBasic {

  @Prop() single = 'single';
  @Prop() multiWord = 'multiWord';
  @Prop({ attr: 'my-custom-attr' }) customAttr = 'my-custom-attr';

  render() {
    return (
      <div id="data-aa">
        <div class="single">
          {this.single}
        </div>
        <div class="multiWord">
          {this.multiWord}
        </div>
        <div class="customAttr">
          {this.customAttr}
        </div>
      </div>
    );
  }
}
