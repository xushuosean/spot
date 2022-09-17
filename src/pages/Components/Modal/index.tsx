import { Modal } from "antd";
import { FC, useEffect, useState } from "react";
import projectTreeViewModel from '@/pages/Components/ProjectTree/vm';

const PopModal = () => {
    const [title, setTitle] = useState<string>('')
    const [content, setContent] = useState<string>('')
    const [visible, setVisible] = useState<boolean>(false)

    useEffect(() => {
        const sub = projectTreeViewModel.openModal$.subscribe(modalProps => {
            if (modalProps.title) setTitle(modalProps.title)
            if (modalProps.content) setContent(modalProps.content)
            setVisible(true)
        });
        return () => {
            sub.unsubscribe();
        }
    }, [])

    return <Modal
        title={title}
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
    >
        {content}
    </Modal>
}

export default PopModal