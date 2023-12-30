import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  VStack,
} from '@chakra-ui/react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useEffect, useState } from 'react';

const AddChapter = ({ novel }) => {
  const [chap, setChap] = useState('');
  const [file, setFile] = useState({});
  const [content, setContent] = useState('');
  useEffect(() => {
    if (novel) {
      setFile(novel);
    }
  }, [novel]);
  const handleSubmit = async () => {};
  return (
    <Flex w={'100%'}>
      <HStack w={'100%'} align={'start'} justify={'center'} gap={10}>
        <VStack w={{ base: '100%', md: '60%' }}>
          <FormControl w={'100%'}>
            <FormLabel>Chapter:</FormLabel>
            <Input
              w={'100px'}
              type='number'
              value={chap}
              focusBorderColor='teal.400'
              onChange={(e) => setChap(Number(e.target.value))}
              required
              isDisabled={file.id ? false : true}
            />
          </FormControl>

          <FormControl w={'100%'}>
            <FormLabel>Content:</FormLabel>
            <CKEditor
              editor={ClassicEditor}
              data=''
              onBlur={(event, editor) => {
                const data = editor.getData();
                setContent(data);
                console.log('data.', data);
              }}
            />
          </FormControl>

          <Button
            type='submit'
            colorScheme='teal'
            mt={'20px'}
            p={'0 20px'}
            size={'xs'}
            onClick={handleSubmit}
          >
            Add Chapter
          </Button>
        </VStack>
      </HStack>
    </Flex>
  );
};

export default AddChapter;
