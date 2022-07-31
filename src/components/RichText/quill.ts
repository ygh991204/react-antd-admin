import Quill, { SelectionChangeHandler } from 'quill'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'

export type SelectionChange = SelectionChangeHandler

export const textAlignParam = ['right', 'center']
export const fontSizeParams = ['xs', 'sm', 'df', 'lg', 'xl', 'xxl', 'xxxl', 'xsl', 'sl', 'ssl', 'sssl']

export const colorParams = ['white', 'gray', 'black', 'red', 'blue', 'green', 'yellow']
export const fontWeightParams = ['regular', 'medium', 'semibold']

/**
 *
 */
//
const DirectionClass = Quill.import('attributors/class/direction')
DirectionClass.keyName = 'richtext-direction'
Quill.register(DirectionClass, true)

//
const AlignClass = Quill.import('attributors/class/align')
AlignClass.whitelist = textAlignParam
AlignClass.keyName = 'richtext-align'
Quill.register(AlignClass, true)

//
const SizeClass = Quill.import('attributors/class/size')
SizeClass.whitelist = fontSizeParams
SizeClass.keyName = 'richtext-size'
Quill.register(SizeClass, true)

//
const ColorClass = Quill.import('attributors/class/color')
ColorClass.whitelist = colorParams
ColorClass.keyName = 'richtext-color'
Quill.register(ColorClass, true)

//
const BackgroundClass = Quill.import('attributors/class/background')
BackgroundClass.whitelist = colorParams
BackgroundClass.keyName = 'richtext-background'
Quill.register(BackgroundClass, true)

const IndentFormats = Quill.import('formats/indent')
IndentFormats.whitelist = [1, 2, 3, 4, 5, 6]
IndentFormats.keyName = 'richtext-indent'
Quill.register(IndentFormats, true)

/**
 *
 */

const Parchment = Quill.import('parchment')
const ParchmentAttributorClass = Parchment.Attributor.Class as {
  new(p1: string, p2: string, p3: IAnyObject): any
}

class AttributorClass extends ParchmentAttributorClass {
}

export const FontWeight = new AttributorClass('weight', 'richtext-weight', {
  scope: Parchment.Scope.INLINE,
  whitelist: fontWeightParams
})
Quill.register('formats/weight', FontWeight, true)

/**
 *
 */
const BlockEmbed = Quill.import('blots/block/embed')

class RichTextPTag extends BlockEmbed {
  static create(value: any) {
    const node = super.create(value)
    node.innerHTML = this.transformValue(value)
    return node
  }

  static transformValue(value: string) {
    let handleArr = value.split('\n')
    handleArr = handleArr.map(e => e.replace(/^[\s]+/, '')
      .replace(/[\s]+$/, ''))
    return handleArr.join('')
  }

  static value(node: any) {
    return node.innerHTML
  }
}

RichTextPTag.blotName = 'RichTextPTag'
RichTextPTag.className = 'richText-p-BlockEmbed'
RichTextPTag.tagName = 'p'

Quill.register(RichTextPTag, true)

//

const Link = Quill.import('formats/link')

class MyLink extends Link {
  static create(value: any) {
    const node = super.create(value)
    value = this.sanitize(value)
    node.setAttribute('href', value)
    return node
  }
}

MyLink.className = 'richText-link'
Quill.register(MyLink, true)

export default Quill
