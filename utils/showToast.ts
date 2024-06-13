export default ({ message = '', id = '', icon = '', delay = 1500 }) => {
  const nToastBus = useEventBus('nToastBus');
  nToastBus.emit({
    message,
    id,
    icon,
    delay
  });
};
