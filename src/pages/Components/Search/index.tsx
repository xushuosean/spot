import ShortcutService from '@/pages/Services/ShortcutService';
import { Input, InputRef } from 'antd';
import {
  SearchOutlined
} from '@ant-design/icons';
import { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable'
import { Content } from '../Content';
import { Mask } from '../Mask'
import styles from './index.less'
import { getDataFaker } from '@/pages/utils';
import { ListItem } from '@/pages/BaseTypes';
import { getData } from '@/request';

export const Search = () => {
  const [visible, setVisible] = useState<boolean>(false)

  const inputRef = useRef<InputRef>(null)

  useEffect(() => {
    if (visible)
      inputRef.current!.focus()
  }, [visible])

  useEffect(() => {
    const searchSub = ShortcutService.search$.subscribe(() => {
      setVisible(!visible);
    })

    return () => {
      searchSub.unsubscribe();
    }
  }, [visible])

  const [searchValue, setSearchValue] = useState('')
  const onValueChange = (e: any) => {
    setSearchValue(e.target.value)
  }


  const [contentData, setContentData] = useState<ListItem[]>([])
  useEffect(() => {
    const listData = getDataFaker(searchValue);
    console.log(searchValue)
    getData(searchValue).then(res => {
      console.log(res)
    })
  }, [searchValue])

  return (
    <>
      <Mask visible={visible} onClick={() => { setVisible(false) }}>
        <Draggable
          defaultPosition={{ x: 300, y: 100 }}
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className={styles.dragBox}
          >
            <Input prefix={<SearchOutlined />} style={{ background: 'inherit' }} value={searchValue} ref={inputRef} onChange={onValueChange} size="large" />
            <Content list={contentData} />
          </div>
        </Draggable>
      </Mask>
    </>
  )
}