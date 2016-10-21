
其中left/right是代表一种绝对的对齐，start/end表示基于阅读顺序的对齐。
如阅读顺序是从左到右(LTR)的国家，start在左边，在阅读顺序是从右到左(RTL)的国家，start在右边。

对于（LTR）的国家，left和start，right和end是用处是一样的，如果（RTL）国家则会相反。因此对于文本首行缩进一类的作用，推荐使用start而不是使用left的绝对的方向。