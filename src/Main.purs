module Main where

import Prelude

import Effect (Effect)
import Effect.Console (log)

main :: Effect Unit
main = do
  log "hello world from purescript!"

add :: Int -> Int -> Int
add x y = x + y
