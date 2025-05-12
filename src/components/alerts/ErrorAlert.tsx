import React from 'react'

function ErrorAlert({children}:{children:React.ReactNode}) {
    return (
        <div className="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="sr-only">Danger</span>
            <div>
                <ul className="mt-1.5 list-disc list-inside">
                    {children}
                </ul>
            </div>
        </div>
    )
}

export default ErrorAlert