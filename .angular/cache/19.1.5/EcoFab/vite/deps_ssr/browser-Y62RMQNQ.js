import { createRequire } from 'module';const require = createRequire(import.meta.url);
import {
  Animation,
  AnimationDriver,
  AnimationEngine,
  AnimationRenderer,
  AnimationRendererFactory,
  AnimationStyleNormalizer,
  BaseAnimationRenderer,
  NoopAnimationDriver,
  NoopAnimationStyleNormalizer,
  WebAnimationsDriver,
  WebAnimationsPlayer,
  WebAnimationsStyleNormalizer,
  allowPreviousPlayerStylesMerge,
  camelCaseToDashCase,
  containsElement,
  createEngine,
  getParentElement,
  invokeQuery,
  normalizeKeyframes,
  validateStyleProperty,
  validateWebAnimatableStyleProperty
} from "./chunk-RD5PZX3F.js";
import "./chunk-3NRKA6OD.js";
import "./chunk-YAGPW5AS.js";
import "./chunk-53Z7NWHP.js";
import "./chunk-YHCV7DAQ.js";
export {
  AnimationDriver,
  NoopAnimationDriver,
  Animation as ɵAnimation,
  AnimationEngine as ɵAnimationEngine,
  AnimationRenderer as ɵAnimationRenderer,
  AnimationRendererFactory as ɵAnimationRendererFactory,
  AnimationStyleNormalizer as ɵAnimationStyleNormalizer,
  BaseAnimationRenderer as ɵBaseAnimationRenderer,
  NoopAnimationStyleNormalizer as ɵNoopAnimationStyleNormalizer,
  WebAnimationsDriver as ɵWebAnimationsDriver,
  WebAnimationsPlayer as ɵWebAnimationsPlayer,
  WebAnimationsStyleNormalizer as ɵWebAnimationsStyleNormalizer,
  allowPreviousPlayerStylesMerge as ɵallowPreviousPlayerStylesMerge,
  camelCaseToDashCase as ɵcamelCaseToDashCase,
  containsElement as ɵcontainsElement,
  createEngine as ɵcreateEngine,
  getParentElement as ɵgetParentElement,
  invokeQuery as ɵinvokeQuery,
  normalizeKeyframes as ɵnormalizeKeyframes,
  validateStyleProperty as ɵvalidateStyleProperty,
  validateWebAnimatableStyleProperty as ɵvalidateWebAnimatableStyleProperty
};
