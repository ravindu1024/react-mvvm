import React from "react";

export type StateCallback<T> = (state: T) => void

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>