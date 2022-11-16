import React from 'react';
import toast, { Toaster } from 'react-hot-toast'
import './boxes.css'

export const MessageBox = (props) => {

  switch (props.variant) {
    case "errorVariant":
      toast.error(props.children)
      break;
    case "successVariant":
      toast.success("Successfully")
      break;
    case "customVariant":
      toast.custom(props.children)
      break;
    case "loadingVariant":
      toast.loading(props.children)
      break;
    default:
      break;
  }
   
  return (
    <div>
      <Toaster />
    </div>
  ) 
}

export const LoadingBox = () => {
  return (
    <div className="loading">
      <i class="fa fa-cog fa-spin fa-2x fa-fw"></i>Loading...
    </div>
  )
}