import EllipsisWords from './ellipsisWords';

const Test = () => {
  const it = {
    title: '3行文本，显示2行',
    tooltip: '我家门前有两棵树，其中一棵是枣树，另一棵也是枣树。突然想去买点橘子，你在这里等下。',
    node: null,
  };
  return (
    <div style={{ width: '200px' }}>
      <EllipsisWords rows={2} tooltip={it.tooltip}>
        {it.node || it.tooltip}
      </EllipsisWords>
    </div>
  );
};

export default Test;
