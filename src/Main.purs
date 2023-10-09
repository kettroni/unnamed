module Main where

import Prelude

import Color (black, blue, white)
import Data.Maybe (Maybe(..))
import Data.Traversable (class Traversable, traverse)
import Effect (Effect)
import Graphics.Canvas (CanvasElement, CanvasGradient, Context2D, LinearGradient, Rectangle, addColorStop, createLinearGradient, fillRect, getCanvasDimensions, getCanvasElementById, getContext2D, setFillStyle, setGradientFillStyle)
import Partial.Unsafe (unsafePartial)

main :: Effect Unit
main = void $ unsafePartial do
  Just canvas <- getCanvasElementById "canvas"
  ctx <- getContext2D canvas
  renderBackgroundColor ctx canvas black
  setDefaultGradientFillStyle ctx defaultColorStops
  fillRect ctx defaultRectangle

renderBackgroundColor :: Context2D -> CanvasElement -> String -> Effect Unit
renderBackgroundColor ctx canvas color = do
  setFillStyle ctx color
  r <- backgroundRect canvas
  fillRect ctx r

backgroundRect :: CanvasElement -> Effect Rectangle
backgroundRect canvas = do
  dims <- getCanvasDimensions canvas
  pure { x: 0.0
       , y: 0.0
       , width: dims.height
       , height: dims.width
       }

type ColorStop = { position :: Number, color :: String }

setDefaultGradientFillStyle :: forall f. Traversable f => Context2D -> f ColorStop -> Effect Unit
setDefaultGradientFillStyle ctx colorStops = do
  canvasGradient <- createLinearGradient ctx defaultGradient
  _ <- traverse (myAddColorStop canvasGradient) colorStops
  setGradientFillStyle ctx canvasGradient

myAddColorStop :: CanvasGradient -> ColorStop -> Effect Unit
myAddColorStop gradient colorStop = addColorStop gradient colorStop.position colorStop.color

defaultColorStops :: Array ColorStop
defaultColorStops =
  [ { position: 0.0, color: blue }
  , { position: 0.5, color: black }
  , { position: 1.0, color: white }
  ]

defaultRectangle :: Rectangle
defaultRectangle = { x: 0.0
                   , y: 0.0
                   , width: 300.0
                   , height: 300.0
                   }

defaultGradient :: LinearGradient
defaultGradient = { x0: defaultRectangle.x
                  , y0: defaultRectangle.y
                  , x1: defaultRectangle.x + defaultRectangle.width
                  , y1: defaultRectangle.y + defaultRectangle.height
                  }
