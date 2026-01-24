import { ImageResponse } from 'next/og'
import { readFileSync } from 'fs'
import { join } from 'path'

export const size = {
    width: 48,
    height: 48,
}
export const contentType = 'image/png'

export default function Icon() {
    try {
        const logoPath = join(process.cwd(), 'public', 'nsc-logo.png')
        const logoData = readFileSync(logoPath)
        const logoBase64 = logoData.toString('base64')
        const logoSrc = `data:image/png;base64,${logoBase64}`

        return new ImageResponse(
            (
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'white',
                        borderRadius: '50%',
                    }}
                >
                    <img src={logoSrc} width="36" height="36" />
                </div>
            ),
            { ...size }
        )
    } catch (e) {
        // Fallback if file read fails (e.g. edge or path issue)
        return new ImageResponse(
            (
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'white',
                        borderRadius: '50%',
                        color: '#6324D1',
                        fontSize: 24,
                        fontWeight: 'bold'
                    }}
                >
                    N
                </div>
            ),
            { ...size }
        )
    }
}
