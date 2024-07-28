'use client';

import React, { useMemo, forwardRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Button, Image, Text, IconButton, useToast } from '@chakra-ui/react';
import { UploadCloudIcon, X } from 'lucide-react';
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

const SingleImageDropzone = forwardRef(
  ({ dropzoneOptions, width, height, value, className, disabled, onChange }, ref) => {
    const toast = useToast();

    const imageUrl = useMemo(() => {
      if (typeof value === 'string') {
        return value;
      } else if (value) {
        return URL.createObjectURL(value);
      }
      return null;
    }, [value]);

    const {
      getRootProps,
      getInputProps,
      acceptedFiles,
      fileRejections,
      isFocused,
      isDragAccept,
      isDragReject,
    } = useDropzone({
      accept: { 'image/*': [] },
      multiple: false,
      disabled,
      onDrop: (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
          onChange && onChange(file);
        }
      },
      ...dropzoneOptions,
    });

    const errorMessage = useMemo(() => {
      if (fileRejections[0]) {
        const { errors } = fileRejections[0];
        if (errors[0]?.code === 'file-too-large') {
          toast({ title: ERROR_MESSAGES.fileTooLarge(dropzoneOptions?.maxSize ?? 0), status: 'error' });
        } else if (errors[0]?.code === 'file-invalid-type') {
          toast({ title: ERROR_MESSAGES.fileInvalidType(), status: 'error' });
        } else if (errors[0]?.code === 'too-many-files') {
          toast({ title: ERROR_MESSAGES.tooManyFiles(dropzoneOptions?.maxFiles ?? 0), status: 'error' });
        } else {
          toast({ title: ERROR_MESSAGES.fileNotSupported(), status: 'error' });
        }
      }
      return undefined;
    }, [fileRejections, dropzoneOptions, toast]);

    return (
      <Box>
        <Box
          {...getRootProps()}
          className={className}
          w={width}
          h={height}
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDir="column"
          borderWidth={2}
          borderStyle="dashed"
          borderColor="gray.400"
          borderRadius="md"
          cursor="pointer"
          bg={isDragAccept ? 'blue.100' : isDragReject ? 'red.100' : 'white'}
          opacity={disabled ? 0.5 : 1}
        >
          <input ref={ref} {...getInputProps()} />

          {imageUrl ? (
            <Box position="relative" width="100%" height="100%" margin={'auto'} justifyItems={'center'} alignItems={'center'}>
              <NextImage src={imageUrl} layout="fill" objectFit="cover" alt={acceptedFiles[0]?.name} />
              {!disabled && (
                <IconButton
                  position="absolute"
                  top={-2}
                  right={-2}
                  icon={<X />}
                  onClick={(e) => {
                    e.stopPropagation();
                    onChange && onChange(undefined);
                  }}
                  aria-label="Remove image"
                  size="xs"
                />
              )}
            </Box>
          ) : (
            <Box textAlign="center" display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
              <UploadCloudIcon className="mb-2" />
              <Text textAlign={'center'}>drag & drop to upload</Text>
              <Button mt={3} disabled={disabled}>
                select
              </Button>
            </Box>
          )}
        </Box>

        {errorMessage && <Text mt={1} color="red.500" fontSize="xs">{errorMessage}</Text>}
      </Box>
    );
  }
);
SingleImageDropzone.displayName = 'SingleImageDropzone';

export { SingleImageDropzone };
