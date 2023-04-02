"use client";
import { MouseEvent, useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../button";

interface ModalProps {
  onClose: () => void;
  onSubmit: () => void;
  secondaryAction?: () => void;
  isOpen?: boolean;
  title?: string;
  actionLabel: string;
  disabled?: boolean;
  secondaryActionLabel?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
}

const Modal: React.FC<ModalProps> = ({
  onClose,
  onSubmit,
  secondaryAction,
  isOpen,
  disabled,
  title,
  body,
  footer,
  actionLabel,
  secondaryActionLabel,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose, disabled]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }
    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        className="
          fixed
          inset-0
          z-50 
          flex 
          items-center 
          justify-center 
          overflow-y-auto 
          overflow-x-hidden 
          bg-neutral-800/70 
          outline-none 
          focus:outline-none"
      >
        <div
          className="
            relative 
            mx-auto my-6 
            h-full w-full 
            md:h-auto md:w-2/3 
            lg:h-auto lg:w-1/2 
            xl:w-2/5"
        >
          {/* CONTENT */}
          <div
            className={`
            translate
            h-full
            duration-300
            ${showModal ? "translate-y-0" : "translate-y-full"}
            ${showModal ? "opacity-100" : "opacity-0"}`}
          >
            <div
              className="
                translate 
                relative 
                flex 
                h-full w-full 
                flex-col 
                rounded-lg border-0 
                bg-white shadow-lg 
                outline-none 
                focus:outline-none 
                md:h-auto 
                lg:h-auto"
            >
              {/* HEADER */}
              <div
                className="
                  relative 
                  flex items-center 
                  justify-center 
                  rounded-t 
                  border-b-[1px] p-6"
              >
                <button
                  onClick={handleClose}
                  className="
                    absolute 
                    left-9 
                    border-0 
                    p-1 
                    transition 
                    hover:opacity-70"
                >
                  <IoMdClose size={18} />
                </button>
                <div className="text-lg font-semibold">{title}</div>
              </div>
              {/* BODY */}
              <div className="relative flex-auto p-6">{body}</div>
              {/* FOOTER */}
              <div className="flex flex-col gap-2 p-6">
                <div className="flex w-full flex-row items-center gap-4">
                  {secondaryAction && secondaryActionLabel && (
                    <Button
                      outline
                      disabled={disabled}
                      label={secondaryActionLabel}
                      onClick={handleSecondaryAction}
                    />
                  )}
                  <Button
                    disabled={disabled}
                    label={actionLabel}
                    onClick={handleSubmit}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
