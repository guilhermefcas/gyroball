import { ImageResponse } from 'next/og'

export const size = {
  width: 32,
  height: 32,
}

export const contentType = 'image/png'

export default async function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #ef4444 0%, #3b82f6 100%)',
          borderRadius: '50%',
        }}
      >
        <div
          style={{
            fontSize: 20,
            fontWeight: 900,
            color: 'white',
            fontFamily: 'sans-serif',
          }}
        >
          G
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
