'use client';

import { formatFileSize } from '@edgestore/react/utils';
import { UploadCloudIcon, X } from 'lucide-react';
import React, { useMemo, useState, forwardRef } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Box,
  Button,
  IconButton,
  SimpleGrid,
  Text,
  useToast,
  CircularProgress,
  CircularProgressLabel,
} from '@chakra-ui/react';
import NextImage from 'next/image';

const ERROR_MESSAGES = {
  fileTooLarge(maxSize) {
    return `The file is too large. Max size is ${formatFileSize(maxSize)}.`;
  },
  fileInvalidType() {
    return 'Invalid file type.';
  },
  tooManyFiles(maxFiles) {
    return `You can only add ${maxFiles} file(s).`;
  },
  fileNotSupported() {
    return 'The file is not supported.';
  },
};

const MultiImageDropzone = forwardRef((props, ref) => {
  const { dropzoneOptions, value, className, disabled, onChange, onFilesAdded } = props;
  const toast = useToast();
  const [customError, setCustomError] = useState();

  const imageUrls = useMemo(() => {
    if (value) {
      return value.map((fileState) => {
        if (typeof fileState.file === 'string') {
          return fileState.file;
        } else {
          return URL.createObjectURL(fileState.file);
        }
      });
    }
    return [];
  }, [value]);

  const {
    getRootProps,
    getInputProps,
    fileRejections,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: { 'image/*': [] },
    disabled,
    onDrop: (acceptedFiles) => {
      const files = acceptedFiles;
      setCustomError(undefined);
      if (
        dropzoneOptions?.maxFiles &&
        (value?.length ?? 0) + files.length > dropzoneOptions.maxFiles
      ) {
        setCustomError(ERROR_MESSAGES.tooManyFiles(dropzoneOptions.maxFiles));
        return;
      }
      if (files) {
        const addedFiles = files.map((file) => ({
          file,
          key: Math.random().toString(36).slice(2),
          progress: 'PENDING',
        }));
        onFilesAdded?.(addedFiles);
        onChange?.([...(value ?? []), ...addedFiles]);
      }
    },
    ...dropzoneOptions,
  });

  const dropZoneClassName = useMemo(
    () =>
      [
        'relative',
        'rounded-md',
        'aspect-square',
        'flex',
        'justify-center',
        'items-center',
        'flex-col',
        'cursor-pointer',
        'min-h-[150px]',
        'min-w-[200px]',
        'border',
        'border-dashed',
        'border-gray-400',
        'transition-colors',
        'duration-200',
        'ease-in-out',
        isFocused && 'border-2',
        disabled && 'bg-gray-200 border-gray-300 cursor-default pointer-events-none bg-opacity-30',
        (isDragReject ?? fileRejections[0]) && 'border border-red-700 bg-red-700 bg-opacity-10',
        isDragAccept && 'border border-blue-500 bg-blue-500 bg-opacity-10',
        className,
      ]
        .filter(Boolean)
        .join(' '),
    [isFocused, fileRejections, isDragAccept, isDragReject, disabled, className],
  );

  const errorMessage = useMemo(() => {
    if (fileRejections[0]) {
      const { errors } = fileRejections[0];
      if (errors[0]?.code === 'file-too-large') {
        toast({
          title: ERROR_MESSAGES.fileTooLarge(dropzoneOptions?.maxSize ?? 0),
          status: 'error',
        });
      } else if (errors[0]?.code === 'file-invalid-type') {
        toast({
          title: ERROR_MESSAGES.fileInvalidType(),
          status: 'error',
        });
      } else if (errors[0]?.code === 'too-many-files') {
        toast({
          title: ERROR_MESSAGES.tooManyFiles(dropzoneOptions?.maxFiles ?? 0),
          status: 'error',
        });
      } else {
        toast({
          title: ERROR_MESSAGES.fileNotSupported(),
          status: 'error',
        });
      }
    }
    return undefined;
  }, [fileRejections, dropzoneOptions, toast]);

  return (
    <Box overflowX="auto" css={{ '&::-webkit-scrollbar': { display: 'none' } }}>
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 3, xl: 4 }} spacing={2}>
        {value?.map(({ file, progress }, index) => (
          <Box  key={index} position="relative" boxShadow="md" borderRadius="md" bg="gray.100">
            <Box position="relative" width="100%" height="0" paddingBottom="100%">
              <NextImage
                src={imageUrls[index]}
                layout="fill"
                objectFit="cover"
                alt={typeof file === 'string' ? file : file.name}
                style={{ borderRadius: 'inherit' }}
              />
            </Box>
            {typeof progress === 'number' && (
              <Box
                position="absolute"
                top="0"
                left="0"
                width="100%"
                height="100%"
                display="flex"
                alignItems="center"
                justifyContent="center"
                bg="blackAlpha.700"
                borderRadius="md"
              >
                <CircularProgress value={progress} color="white">
                  <CircularProgressLabel>{Math.round(progress)}%</CircularProgressLabel>
                </CircularProgress>
              </Box>
            )}
            {imageUrls[index] && !disabled && progress === 'PENDING' && (
              <IconButton
                icon={<X />}
                size="sm"
                position="absolute"
                top="1"
                right="1"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange?.(value.filter((_, i) => i !== index) ?? []);
                }}
                aria-label="Remove image"
              />
            )}
          </Box>
        ))}
        {(!value || value.length < (dropzoneOptions?.maxFiles ?? 0)) && (
          <Box
            {...getRootProps({
              className: dropZoneClassName,
            })}
          >
            <input ref={ref} {...getInputProps()} />
            <Box 
            minH={'220px'}

            textAlign="center" 
             display="flex"
             justifyContent="center"
             alignItems="center"
             flexDir="column"
             borderWidth={2}
             borderStyle="dashed"
             borderColor="gray.400"
             borderRadius="md"
             cursor="pointer"
            >
              <UploadCloudIcon className="mb-2" />
              <Text>drag & drop to upload</Text>
              <Button mt={3} disabled={disabled}>
                select
              </Button>
            </Box>
          </Box>
        )}
      </SimpleGrid>
      <Text mt={1} color="red.500" fontSize="xs">
        {customError ?? errorMessage}
      </Text>
    </Box>
  );
});
MultiImageDropzone.displayName = 'MultiImageDropzone';

export { MultiImageDropzone };
