import ShortcutService from '@/pages/Services/ShortcutService';
import { Input, InputRef } from 'antd';
import {
  SearchOutlined
} from '@ant-design/icons';
import { useContext, useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable'
import { Content } from '../Content';
import { Mask } from '../Mask'
import styles from './index.less'
import { getDataFaker } from '@/pages/utils';
import { ListItem } from '@/pages/BaseTypes';
import { getData } from '@/request';
import { searchContext } from '../utils';

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
    getData(searchValue).then(res => {
      setContentData(res.hits)
    })
  }, [searchValue])

  useEffect(() => {
    const sub = ShortcutService.actionOver$.subscribe(() => {
      setVisible(false)
    });

    return () => {
      sub.unsubscribe();
    }
  }, [])


  return (
    <>
      <searchContext.Provider value={{ searchValue: searchValue }}>
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
      </searchContext.Provider>
    </>
  )
}