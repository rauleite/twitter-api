import { PostgrestClient } from '@supabase/postgrest-js'
import { Router } from 'itty-router'
import { FetchEvent } from './types'
// import fetch from 'cross-fetch'

const router = Router()

// @ts-ignore
const client = new PostgrestClient(POSTGREST_ENDPOINT)

console.log('client.from(users).select()', JSON.stringify(client.from('users').select()))

addEventListener('fetch', (event: FetchEvent) => {
  // addEventListener('fetch', event => {
  event.respondWith(router.handle(event.request))
})

router.get('/users', async () => {
  console.log('|||users')
  console.log('client', JSON.stringify(client))
  const { data: users, error } = await client.from('users').select()
  // const u = await client.from('users').select()
  // console.log('u', u)
  // console.log('data', data)
  // console.log('error', error)
  // const error = null
  // const users = {
  //   name: "raul",
  //   id: "1"
  // }
  // console.log('-> users', JSON.stringify(users))
  if (error) throw error

  return new Response(JSON.stringify({ users }), {
    // return new Response('{\"test\": \"test\"}', {
    headers: { 'content-type': 'application/json' },
  })
})

router.get('/users/:id', async ({ params }) => {
  console.log('|||users/:id')
  const { id } = params
  const { data, error } = await client
    .from('users')
    .select()
    .eq('id', id)

  if (error) throw error

  const user = data.length ? data[0] : null

  return new Response(JSON.stringify({ user }), {
    headers: { 'content-type': 'application/json' },
    status: user ? 200 : 404
  })
})

router.post('/users', async request => {
  const userData = await request.json()
  const { data: user, error } = await client
    .from('users')
    .insert([userData])

  if (error) throw error

  return new Response(JSON.stringify({ user }), {
    headers: { 'content-type': 'application/json' },
  })
})

router.all('*', () => new Response("Not Found", { status: 404 }))
