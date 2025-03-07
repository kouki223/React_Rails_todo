import { Checkbox, Flex, Text, Input, Button } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useState } from "react";

const Task = (props) => {
  const [isEdit, setIsEdit] = useState(false)
  const [editName, setEditName] = useState(props.name)

  const onClickEdit = () => {
    console.log("編集ボタンをクリックしました")
    setIsEdit(true)
  }

  const onClicSave = () => {
    console.log("保存ボタンをクリックしました")
    setIsEdit(false)
  }

  const onClickCancel = () => {
    console.log("キャンセルボタンをクリックしました")
    setIsEdit(false)
  }

  return (
    <Flex mb="16px" justifyContent="space-between" alignItems="center">
      <Checkbox
        isChecked={props.isDone}
        colorScheme="blue"
        size="lg"
        onChange={() => {
          props.toggleIsDone(props.id, props.index);
        }}
      >
      </Checkbox>
      {!isEdit ?
      <>
        <Text>{props.name}</Text>
        <Button onClick={onClickEdit}>編集</Button>
      </>
      :
      <Flex>
        <Input value={editName} onChange={(e) => setEditName(e.target.value)} />
        <Button onClick={onClicSave}>保存</Button>
        <Button onClick={onClickCancel}>キャンセル</Button>
      </Flex>
      }
      <CloseIcon onClick={() => props.destroyTask(props.id)} />
    </Flex>
  );
};

export default Task;