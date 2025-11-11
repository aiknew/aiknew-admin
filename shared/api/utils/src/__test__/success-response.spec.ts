import { SuccessResponse } from "../success-response"
import { ResponseStatusCode } from "@aiknew/shared-api-enums"

describe("success-response", () => {
  let successResponse: SuccessResponse

  beforeEach(() => {
    successResponse = new SuccessResponse()
  })

  describe("default values", () => {
    it("should have default code set to COMMON_SUCCESS", () => {
      expect(successResponse.code).toBe(ResponseStatusCode.COMMON_SUCCESS)
    })

    it('should have default msg set to "success"', () => {
      expect(successResponse.msg).toBe("success")
    })

    it("should have default data set to empty object", () => {
      expect(successResponse.data).toEqual({})
    })

    it("should have default isRaw set to false", () => {
      expect(successResponse.isRaw).toBe(false)
    })

    it("should have default rawData set to undefined", () => {
      expect(successResponse.rawData).toBeUndefined()
    })
  })

  describe("setCode method", () => {
    it("should set the code and return the instance for chaining", () => {
      const result = successResponse.setCode(ResponseStatusCode.BAD_REQUEST)

      expect(successResponse.code).toBe(ResponseStatusCode.BAD_REQUEST)
      expect(result).toBe(successResponse) // should return this for method chaining
    })
  })

  describe("setData method", () => {
    it("should set the data and return the instance for chaining", () => {
      const testData = { user: { id: 1, name: "John" } }
      const result = successResponse.setData(testData)

      expect(successResponse.data).toEqual(testData)
      expect(result).toBe(successResponse) // should return this for method chaining
    })

    it("should set complex nested data", () => {
      const complexData = {
        users: [
          { id: 1, name: "John", roles: ["admin"] },
          { id: 2, name: "Jane", roles: ["user"] },
        ],
        pagination: { page: 1, total: 2 },
      }

      successResponse.setData(complexData)
      expect(successResponse.data).toEqual(complexData)
    })
  })

  describe("setMsg method", () => {
    it("should set the message and return the instance for chaining", () => {
      const customMsg = "Operation completed successfully"
      const result = successResponse.setMsg(customMsg)

      expect(successResponse.msg).toBe(customMsg)
      expect(result).toBe(successResponse) // should return this for method chaining
    })
  })

  describe("setRaw method", () => {
    it("should set isRaw to true, set rawData, and return instance for chaining", () => {
      const rawData = [
        { id: 1, name: "John" },
        { id: 2, name: "Jane" },
      ]
      const result = successResponse.setRaw(rawData)

      expect(successResponse.isRaw).toBe(true)
      expect(successResponse.rawData).toEqual(rawData)
      expect(result).toBe(successResponse) // should return this for method chaining
    })

    it("should handle different types of raw data", () => {
      const stringData = "Simple string response"
      const numberData = 42
      const booleanData = true

      successResponse.setRaw(stringData)
      expect(successResponse.rawData).toBe(stringData)

      successResponse.setRaw(numberData)
      expect(successResponse.rawData).toBe(numberData)

      successResponse.setRaw(booleanData)
      expect(successResponse.rawData).toBe(booleanData)
    })
  })

  describe("method chaining", () => {
    it("should support method chaining for all setter methods", () => {
      const testData = { result: "test" }
      const customMsg = "Custom message"

      const response = successResponse
        .setCode(ResponseStatusCode.BAD_REQUEST)
        .setData(testData)
        .setMsg(customMsg)
        .getResponse()

      expect(response).toEqual({
        code: ResponseStatusCode.BAD_REQUEST,
        data: testData,
        msg: customMsg,
      })
    })

    it("should support chaining with setRaw and getResponse", () => {
      const rawData = { id: 1, status: "active" }

      const response = successResponse.setRaw(rawData).getResponse()

      expect(response).toEqual(rawData)
    })
  })

  describe("edge cases", () => {
    it("should throw error when undefined is passed to setData", () => {
      expect(() => successResponse.setData(undefined as never)).toThrow(
        "data should be an object",
      )
    })

    it("should handle switching between raw and regular response modes", () => {
      const rawData = ["raw", "data"]
      const regularData = { formatted: "data" }

      successResponse.setRaw(rawData)
      expect(successResponse.getResponse()).toEqual(rawData)

      successResponse.isRaw = false
      successResponse.setData(regularData)
      successResponse.setMsg("Regular response")
      const response = successResponse.getResponse()

      expect(response).toEqual({
        code: ResponseStatusCode.COMMON_SUCCESS,
        data: regularData,
        msg: "Regular response",
      })
    })
  })
})
