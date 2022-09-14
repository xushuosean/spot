import React, { FC } from "react"
import styles from './index.less'

export const ContentWrapper: FC<React.PropsWithChildren> = ({ children }) => {
  return <div className={styles.contentWrapper}>
    {children}
  </div>
}