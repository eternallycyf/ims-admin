import cx from 'classnames'
import React from 'react'
import styles from './index.module.less'

const Star = function ({ color = '#fff' }: { color?: string }) {
  const width = 20
  const half = 10 // width/2;
  const quat = 5 // width/4;
  return (
    <svg
      version="1.1"
      viewBox={`0 0 ${width} ${width}`}
      height={width}
      width={width}
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <path
        d={`M 0 ${half} c ${quat} 0 ${half} -${quat} ${half} -${half} c 0 ${quat} ${quat} ${half} ${half} ${half} c -${quat} 0 -${half} ${quat} -${half} ${half} c 0 -${quat} -${quat} -${half} -${half} -${half}`}
        stroke={color}
        strokeWidth={1}
        fill={color}
      />
    </svg>
  )
}

interface ViewProps {
  active?: boolean
  onClick?: (active: boolean) => any
  style?: React.CSSProperties
}

export default class ButtonWeather extends React.Component<ViewProps> {
  public static displayName = 'ButtonWeather'
  public render() {
    return (
      <span
        style={this.props.style}
        className={cx(styles.button, { [styles.night]: this.props.active })}
        onClick={() => this.props.onClick(!this.props.active)}
      >
        <span className={styles.btnInner}>
          <span className={styles.circle}>
            <span className={styles.circleNight}>
              <span className={styles.crater} />
              <span className={cx(styles.crater, styles.crater2)} />
              <span className={cx(styles.crater, styles.crater3)} />
            </span>
          </span>
          <span className={styles.haloBox}>
            <span className={styles.halo} />
            <span className={cx(styles.halo, styles.halo2)} />
            <span className={cx(styles.halo, styles.halo3)} />
          </span>
          <span className={styles.clouds}>
            {[...Array(7)].map((_, ind) => (
              <span className={cx(styles.cloud, styles[`cloud${ind + 1}`])} key={`${ind}cloud`} />
            ))}
          </span>
          <span className={cx(styles.clouds, styles.clouds2)}>
            {[...Array(7)].map((_, ind) => (
              <span className={cx(styles.cloud, styles[`cloud${ind + 1}`])} key={`${ind}cloud`} />
            ))}
          </span>
          <span className={styles.stars}>
            <span className={styles.star}>
              <Star />
            </span>
            {[...Array(10)].map((_, ind) => (
              <span className={cx(styles.star, styles[`star${ind + 1}`])} key={`${ind}star`}>
                <Star />
              </span>
            ))}
          </span>
        </span>
      </span>
    )
  }
}
