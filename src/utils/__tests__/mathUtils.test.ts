import { describe, it, expect } from 'vitest'
import {
  generateLevel1Question,
  generateLevel2Question,
  generateLevel3Question,
} from '../mathUtils'

describe('generateLevel1Question', () => {
  it('creates valid addition and subtraction questions', () => {
    for (let i = 0; i < 50; i++) {
      const q = generateLevel1Question()
      expect(q.options).toHaveLength(4)
      expect(new Set(q.options).size).toBe(4)
      expect(q.options).toContain(q.correctAnswer)

      const match = q.expression.match(/(\d+)\s*([+-])\s*(\d+)/)
      expect(match).not.toBeNull()
      const first = parseInt(match![1], 10)
      const op = match![2]
      const second = parseInt(match![3], 10)

      expect(first).toBeGreaterThanOrEqual(1)
      expect(first).toBeLessThanOrEqual(20)
      expect(second).toBeGreaterThanOrEqual(1)
      expect(second).toBeLessThanOrEqual(20)
      const result = op === '+' ? first + second : first - second
      expect(result).toBe(q.correctAnswer)
      expect(result).toBeGreaterThanOrEqual(0)
      expect(result).toBeLessThanOrEqual(20)
    }
  })
})

describe('generateLevel2Question', () => {
  it('creates valid three number expressions', () => {
    for (let i = 0; i < 50; i++) {
      const q = generateLevel2Question()
      expect(q.options).toHaveLength(4)
      expect(new Set(q.options).size).toBe(4)
      expect(q.options).toContain(q.correctAnswer)

      const match = q.expression.match(/(\d+)\s*([+-])\s*(\d+)\s*([+-])\s*(\d+)/)
      expect(match).not.toBeNull()
      const a = parseInt(match![1], 10)
      const op1 = match![2]
      const b = parseInt(match![3], 10)
      const op2 = match![4]
      const c = parseInt(match![5], 10)

      ;[a, b, c].forEach(n => {
        expect(n).toBeGreaterThanOrEqual(0)
        expect(n).toBeLessThanOrEqual(15)
      })

      const intermediate = op1 === '+' ? a + b : a - b
      const result = op2 === '+' ? intermediate + c : intermediate - c
      expect(result).toBe(q.correctAnswer)
      expect(result).toBeGreaterThanOrEqual(0)
      expect(result).toBeLessThanOrEqual(25)
    }
  })
})

describe('generateLevel3Question', () => {
  it('creates valid number sequences', () => {
    for (let i = 0; i < 50; i++) {
      const q = generateLevel3Question()
      expect(q.options).toHaveLength(4)
      expect(new Set(q.options).size).toBe(4)
      expect(q.options).toContain(q.correctAnswer)

      const match = q.expression.match(/\[(\d+)\] \[(\d+)\] \[(\d+)\] \[\?\]/)
      expect(match).not.toBeNull()
      const nums = match!.slice(1, 4).map(v => parseInt(v, 10))
      nums.forEach(n => {
        expect(n).toBeGreaterThanOrEqual(0)
        expect(n).toBeLessThanOrEqual(30)
      })

      const step1 = nums[1] - nums[0]
      const step2 = nums[2] - nums[1]
      expect(step1).toBe(step2)
      const result = nums[2] + step1
      expect(result).toBe(q.correctAnswer)
      expect(result).toBeGreaterThanOrEqual(0)
      expect(result).toBeLessThanOrEqual(30)
    }
  })
})
