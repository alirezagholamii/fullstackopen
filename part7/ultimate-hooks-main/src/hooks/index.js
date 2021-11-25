import { useState, useEffect } from "react"
import axios from 'axios'

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(baseUrl)
        setResources(result.data)
      } catch (e) {
        console.log(e);
      }
    }
    fetchData()
  }, [baseUrl])

  const create = async (resource) => {
    const result = await axios.post(baseUrl, resource);
    setResources(resources.concat(result.data))
  }


  const service = {
    create
  }

  return [
    resources, service
  ]
}

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}