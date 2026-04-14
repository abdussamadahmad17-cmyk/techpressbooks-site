import { seoType } from "./objects/seoType"
import { portableTextType } from "./objects/portableTextType"
import { codeBlockType } from "./objects/codeBlockType"
import { calloutType } from "./objects/calloutType"
import { faqItemType } from "./objects/faqItemType"
import { tocItemType } from "./objects/tocItemType"
import { ctaLinkType } from "./objects/ctaLinkType"

import { authorType } from "./documents/authorType"
import { categoryType } from "./documents/categoryType"
import { tagType } from "./documents/tagType"
import { bookType } from "./documents/bookType"
import { postType } from "./documents/postType"
import { siteSettingsType } from "./documents/siteSettingsType"

export const schemaTypes = [
  seoType,
  portableTextType,
  codeBlockType,
  calloutType,
  faqItemType,
  tocItemType,
  ctaLinkType,
  authorType,
  categoryType,
  tagType,
  bookType,
  postType,
  siteSettingsType
]