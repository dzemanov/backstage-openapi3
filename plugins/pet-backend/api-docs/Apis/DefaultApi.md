# DefaultApi

All URIs are relative to _http://localhost_

| Method                                   | HTTP request       | Description        |
| ---------------------------------------- | ------------------ | ------------------ |
| [**healthGet**](DefaultApi.md#healthGet) | **GET** /health    | Health check       |
| [**petsGet**](DefaultApi.md#petsGet)     | **GET** /pets      |                    |
| [**petsIdGet**](DefaultApi.md#petsIdGet) | **GET** /pets/{id} | Get a pet by ID    |
| [**petsIdPut**](DefaultApi.md#petsIdPut) | **PUT** /pets/{id} | Update a pet by ID |
| [**petsPost**](DefaultApi.md#petsPost)   | **POST** /pets     | Create a new pet   |

<a name="healthGet"></a>

# **healthGet**

> \_health_get_200_response healthGet()

Health check

### Parameters

This endpoint does not need any parameter.

### Return type

[**\_health_get_200_response**](../Models/_health_get_200_response.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="petsGet"></a>

# **petsGet**

> List petsGet(name)

    Get pets by name

### Parameters

| Name     | Type       | Description                 | Notes             |
| -------- | ---------- | --------------------------- | ----------------- |
| **name** | **String** | Name of the pet to retrieve | [default to null] |

### Return type

[**List**](../Models/Pet.md)

### Authorization

[JWT](../README.md#JWT)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json; charset=utf-8

<a name="petsIdGet"></a>

# **petsIdGet**

> Pet petsIdGet(id, type)

Get a pet by ID

### Parameters

| Name     | Type       | Description                  | Notes                        |
| -------- | ---------- | ---------------------------- | ---------------------------- |
| **id**   | **String** |                              | [default to null]            |
| **type** | **String** | Type of the pet to filter by | [optional] [default to null] |

### Return type

[**Pet**](../Models/Pet.md)

### Authorization

[JWT](../README.md#JWT)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json; charset=utf-8

<a name="petsIdPut"></a>

# **petsIdPut**

> Pet petsIdPut(id, PetUpdate)

Update a pet by ID

### Parameters

| Name          | Type                                    | Description | Notes             |
| ------------- | --------------------------------------- | ----------- | ----------------- |
| **id**        | **String**                              |             | [default to null] |
| **PetUpdate** | [**PetUpdate**](../Models/PetUpdate.md) |             | [optional]        |

### Return type

[**Pet**](../Models/Pet.md)

### Authorization

[JWT](../README.md#JWT)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json; charset=utf-8

<a name="petsPost"></a>

# **petsPost**

> Pet petsPost(Pet)

Create a new pet

### Parameters

| Name    | Type                        | Description | Notes      |
| ------- | --------------------------- | ----------- | ---------- |
| **Pet** | [**Pet**](../Models/Pet.md) |             | [optional] |

### Return type

[**Pet**](../Models/Pet.md)

### Authorization

[JWT](../README.md#JWT)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json; charset=utf-8
