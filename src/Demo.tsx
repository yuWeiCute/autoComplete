import React, { useEffect, useState } from "react";
import {
  notFoundContent,
  debounceDelay,
  placeholder,
  dropdownClassname
} from "./apis";

const Demo = (props: { options: Array<string> }) => {
  const [filtered, setFiltered] = useState([]);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [inputWithDelay, setInputWithDelay] = useState<string>("");

  //debounce 延迟显示
  useEffect(() => {
    const handler = window.setTimeout(() => {
      const { options } = props;
      const newFilterer = options.filter(
        (option: string) =>
          option.toLowerCase().indexOf(input.toLowerCase()) > -1
      );
      //将筛选后的列表放入state
      setFiltered(newFilterer);
      setInputWithDelay(input);
      console.log(inputWithDelay);
    }, debounceDelay);
    return () => {
      clearTimeout(handler);
    };
  }, [input]);

  //输入改变时
  const onChange = (e: {
    currentTarget: { value: React.SetStateAction<string> };
  }) => {
    setIsShow(true);
    setInput(e.currentTarget.value);
  };

  //下拉框选择 填充至输入框
  const onClick = (e: {
    currentTarget: { innerText: React.SetStateAction<string> };
  }) => {
    setFiltered([]);
    setIsShow(false);
    setInput(e.currentTarget.innerText);
  };

  //提示的文本列表中，将输入框中的文字高亮显示
  const filterHighlighter = (option: string, input: string) => {
    const arr = option.toLowerCase().split(input.toLowerCase());
    const viewArr = new Array();
    let startIndex = 0,
      endIndex = 0;
    for (let i = 0; i < arr.length; i++) {
      endIndex += arr[i].length;
      viewArr.push([option.substring(startIndex, endIndex)]);
      startIndex = endIndex;
      endIndex += input.length;
      viewArr[i].push(option.substring(startIndex, endIndex));
      startIndex = endIndex;
    }
    return viewArr;
  };

  //所提示的文字以列表形式呈现
  const renderdemo = () => {
    if (isShow && input) {
      if (filtered.length) {
        return (
          <ul className={dropdownClassname}>
            {filtered.map((option, _) => {
              const viewArr = filterHighlighter(option, inputWithDelay);
              // console.log(viewArr);
              return (
                <li key={option} onClick={onClick}>
                  {viewArr.map((_, index) => {
                    return (
                      <span key={index}>
                        {viewArr[index][0]}
                        <span className={`highlighter-${dropdownClassname}`}>
                          {viewArr[index][1]}
                        </span>
                      </span>
                    );
                  })}
                </li>
              );
            })}
          </ul>
        );
      } else {
        {
          return notFoundContent();
        }
      }
    }
  };

  return (
    <div>
      <input
        type="text"
        onChange={onChange}
        placeholder={placeholder}
        value={input}
      />
      {renderdemo()}
    </div>
  );
};

export default Demo;
