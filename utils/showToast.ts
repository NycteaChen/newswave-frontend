export default ({ message = '', id = '', icon = '', delay = 3000 }) => {
  const toast = useEventBus('toast');
  toast.emit({
    message,
    id,
    icon,
    delay
  });
};
