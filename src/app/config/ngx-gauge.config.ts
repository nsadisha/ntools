const bmiThresholdConfig = {
  '0': {color: 'red'},
  '16': {color: 'pink'},
  '17': {color: 'yellow'},
  '18.5': {color: 'green'},
  '25': {color: 'yellow'},
  '30': {color: 'orange'},
  '35': {color: 'red'},
};

const commonMarKerConfig = {
  color: "black",
  type: "line",
  size: 5,
  font: "12px arial"
}

export const bmiMarkerConfig = {
  adultMen: {
    "16": {
      ...commonMarKerConfig,
      label: "16",
    },
    "17": {
      ...commonMarKerConfig,
      label: "17",
    },
    "18.5": {
      ...commonMarKerConfig,
      label: "18.5",
    },
    "25": {
      ...commonMarKerConfig,
      label: "25",
    },
    "30": {
      ...commonMarKerConfig,
      label: "30",
    },
    "35": {
      ...commonMarKerConfig,
      label: "35",
    },
    "40": {
      ...commonMarKerConfig,
      label: "40",
    },
  }
}

export const bmiGaugeConfig = {
  type: 'arch',
  label: 'BMI',
  // gaugeAppendText: 'kg/m²',
  gaugeAppendText: '',
  min: 10,
  max: 45,
  thickness: 15,
  size: 260,
  duration: 750,
  foregroundColor: '#1890ff',
  thresholds: bmiThresholdConfig,
};
