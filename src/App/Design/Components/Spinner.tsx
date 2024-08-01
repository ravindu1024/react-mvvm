import React from 'react'

interface SpinnerProps{
    className?: string
}

export const Spinner: React.FC<SpinnerProps> = ({className}: SpinnerProps) => {
    return(
        <div className={`d-flex justify-content-center ${className ?? ""}`}>
            <div className="spinner-border mt-5" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
    )
}

export default Spinner