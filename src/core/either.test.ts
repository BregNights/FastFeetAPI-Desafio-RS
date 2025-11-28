import { expect, it } from "vitest"
import { Either, left, right } from "./either"

function doSomething(shouldSucess: boolean): Either<string, number> {
  if (shouldSucess) {
    return right(10)
  } else {
    return left("error")
  }
}

it("sucess result", () => {
  const result = doSomething(true)

  expect(result.isRight()).toBe(true)
  expect(result.isLeft()).toBe(false)
})

it("error result", () => {
  const result = doSomething(false)

  if (result.isRight()) {
    console.log(result.value)
  }

  expect(result.isLeft()).toBe(true)
  expect(result.isRight()).toBe(false)
})
