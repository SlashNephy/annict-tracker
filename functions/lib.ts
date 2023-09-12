export function json<T extends Record<string, unknown>>(object: T, init?: ResponseInit): Response {
  return new Response(JSON.stringify(object), {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    ...init,
  })
}
