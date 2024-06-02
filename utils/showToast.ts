export default ({ message = '', id = '', icon = '', delay = 3000 }) => {
  const nToastBus = useEventBus('nToastBus');
  nToastBus.emit({
    message,
    id,
    icon,
    delay
  });
};
