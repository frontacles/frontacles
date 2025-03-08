import { bench, describe } from 'vitest'

import { EmailClassWithURL, EmailClassWithRegExp, isEmailWithRegExp } from './email.implementations'

import joi from 'joi'
import isEmail from 'validator/es/lib/isEmail'
import * as valibot from 'valibot'
import yup from 'yup'
import { z } from 'zod'

describe('url/email passing all tests', () => {
  const EmailWithURL = EmailClassWithURL
  const EmailWithRegExp = EmailClassWithRegExp
  const emailWithRegExp = isEmailWithRegExp
  const validatorIsEmail = isEmail
  const y = yup

  const yupSchema = y.string().email()

  bench('`EmailWithURL.canParse` (current)', () =>
    EmailWithURL.canParse('someone@domain.tld')
  )

  bench('`EmailClassWithRegExp.canParse`', () =>
    EmailWithRegExp.canParse('someone@domain.tld')
  )

  bench('`emailWithRegExp`', () =>
    emailWithRegExp('someone@domain.tld')
  )

  bench('`validator/isEmail`', () =>
    validatorIsEmail('someone@domain.tld')
  )

  bench('yup create schema and `isValidSync`', () =>
    y.string().email().isValidSync('someone@domain.tld')
  )

  bench('yup precalculated schema `isValidSync`', () =>
    yupSchema.isValidSync('someone@domain.tld')
  )
})

describe('url/email not passing all tests', () => {
  const j = joi
  const v = valibot
  const zod = z

  const joiSchema = j.string().email()
  const vSchema = v.pipe(v.string(), v.email())
  const zodSchema = zod.string().email()

  bench('joi create schema and `.validate`', () =>
    j.string().email().validate('someone@domain.tld')
  )

  bench('joi precalculated schema `.validate`', () =>
    joiSchema.validate('someone@domain.tld')
  )

  bench('valibot create schema and `.is`', () => {
    const vEmailSchema = v.pipe(v.string(), v.email())
    v.is(vEmailSchema, 'someone@domain.tld')
  })

  bench('valibot precalculated schema `.is`', () =>
    v.is(vSchema, 'someone@domain.tld')
  )

  bench('zod create schema and `.parse`', () =>
    zod.string().email().parse('someone@domain.tld')
  )

  bench('zod precalculated schema `.parse`', () =>
    zodSchema.parse('someone@domain.tld')
  )
})
