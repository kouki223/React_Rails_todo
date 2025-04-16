import { Checkbox, Flex, Text, Input, Button, Box,} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useState } from "react";
import axios from "axios";

const Task = (props) => {
  const [isEdit, setIsEdit] = useState(false)
  const [editName, setEditName] = useState(props.name)

  const onClickEdit = () => {
    console.log("編集ボタンをクリックしました")
    setIsEdit(true)
  }

  const onClickSave = async (id) => {
    console.log("保存ボタンをクリックしました")
    await axios.put(`http://localhost:3010/tasks/edit/${id}`,{name: editName})
    setIsEdit(false)
    props.fetch();
  }

  const onClickCancel = () => {
    console.log("キャンセルボタンをクリックしました")
    setIsEdit(false)
    setEditName(props.name)
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
        <Text marginLeft="8px" fontWeight="bold" marginRight="auto">{props.name}</Text>
        :
        <Input value={editName} onChange={(e) => setEditName(e.target.value)} />
      }
      {!isEdit ?
        <Box marginRight="8px" marginLeft="auto">
          <Button onClick={onClickEdit}>編集</Button>
        </Box>
        :
        <Flex margin="10px">
          <Button onClick={() => onClickSave(props.id)}>保存</Button>
          <Button onClick={onClickCancel}>キャンセル</Button>
        </Flex>
      }
      <CloseIcon onClick={() => props.destroyTask(props.id)} />
    </Flex>
  );
};

export default Task;