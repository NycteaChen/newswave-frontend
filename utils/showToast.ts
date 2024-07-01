export default ({ message = '', type = 'success', id = '', icon = 'tick', iconColor = 'success', delay = 1500 }) => {
  const nToastBus = useEventBus('nToastBus');

  switch (type) {
    case 'warning':
      nToastBus.emit({
        message,
        id,
        icon: 'warning',
        iconColor: 'danger',
        delay
      });
      break;
    default:
      nToastBus.emit({
        message,
        id,
        icon,
        iconColor,
        delay
      });
      break;
  }
};
