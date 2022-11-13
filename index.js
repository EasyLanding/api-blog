import express from 'express'
import mongoose from 'mongoose'
import router from './router/router.js'
import cors from 'cors'
import * as dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import Middleware from './middleware/Middleware.js'
import fs from 'fs'
import swaggerUi from 'swagger-ui-express'

const swagger = {
  'swagger': '2.0',
  'info': {
    'description':
      'This is a simple example NodeJS API project to demonstrate Swagger Documentation',
    'version': '1.0.0',
    'title': 'Tasks API',
    'contact': {
      'email': 'abc@gmail.com'
    },
    'license': {
      'name': 'Apache 2.0',
      'url': 'http://www.apache.org/licenses/LICENSE-2.0.html'
    }
  },
  'schemes': ['http'],
  'host': 'localhost:3080',
  'basePath': '/api',
  'paths': {
    '/articles': {
      'get': {
        'summary': 'Get all the tasks',
        'description': 'Get all the tasks',
        'produces': ['application/json'],
        'parameters': [{ 'required': true }],
        'responses': {
          '200': {
            'description': 'successful operation',
            'schema': {
              'type': 'array',
              'items': {
                '$ref': '#/definitions/todosResponse'
              }
            }
          },
          '400': {
            'description': 'Invalid status value',
            'schema': {
              '$ref': '#/definitions/InvalidResponse'
            }
          }
        }
      },
      'post': {
        'summary': 'Save the task',
        'description': 'Save the task',
        'produces': ['application/json'],
        'consumes': ['application/json'],
        'parameters': [
          {
            'in': 'body',
            'name': 'body',
            'description': 'task object',
            'required': true,
            'schema': {
              'type': 'object',
              'properties': {
                'task': {
                  'type': 'object',
                  '$ref': '#/definitions/Task'
                }
              }
            }
          }
        ],
        'responses': {
          '200': {
            'description': 'successful operation',
            'schema': {
              'type': 'array',
              'items': {
                '$ref': '#/definitions/todosResponse'
              }
            }
          },
          '400': {
            'description': 'Invalid status value',
            'schema': {
              '$ref': '#/definitions/InvalidResponse'
            }
          }
        }
      }
    },
    '/articles/{id}': {
      'get': {
        'summary': 'Get all the tasks',
        'description': 'Get all the tasks',
        'produces': ['application/json'],
        'parameters': [{ 'required': true }],
        'responses': {
          '200': {
            'description': 'successful operation',
            'schema': {
              'type': 'array',
              'items': {
                '$ref': '#/definitions/todosResponse'
              }
            }
          },
          '400': {
            'description': 'Invalid status value',
            'schema': {
              '$ref': '#/definitions/InvalidResponse'
            }
          }
        }
      },
      'put': {
        'summary': 'Update the tasks',
        'description': 'Update the tasks',
        'produces': ['application/json'],
        'parameters': [
          {
            'name': 'id',
            'in': 'path',
            'description': 'task id that needs to be deleted',
            'required': true,
            'type': 'string'
          },
          {
            'in': 'body',
            'name': 'body',
            'description': 'task object',
            'required': true,
            'schema': {
              'type': 'object',
              'properties': {
                'task': {
                  'type': 'object',
                  '$ref': '#/definitions/Task'
                }
              }
            }
          }
        ],
        'responses': {
          '200': {
            'description': 'successful operation',
            'schema': {
              'type': 'array',
              'items': {
                '$ref': '#/definitions/todosResponse'
              }
            }
          },
          '400': {
            'description': 'Invalid status value',
            'schema': {
              '$ref': '#/definitions/InvalidResponse'
            }
          }
        }
      },
      'delete': {
        'summary': 'Delete the task',
        'description': 'Delete the task',
        'produces': ['application/json'],
        'parameters': [
          {
            'name': 'id',
            'in': 'path',
            'description': 'task id that needs to be deleted',
            'required': true,
            'type': 'string'
          }
        ],
        'responses': {
          '200': {
            'description': 'successful operation',
            'schema': {
              'type': 'array',
              'items': {
                '$ref': '#/definitions/todosResponse'
              }
            }
          },
          '400': {
            'description': 'Invalid status value',
            'schema': {
              '$ref': '#/definitions/InvalidResponse'
            }
          }
        }
      }
    }
  },
  'definitions': {
    'todosResponse': {
      'type': 'object',
      'properties': {
        'id': {
          'type': 'integer'
        },
        'task': {
          'type': 'string'
        },
        'assignee': {
          'type': 'string'
        },
        'status': {
          'type': 'string'
        }
      }
    },
    'Task': {
      'type': 'object',
      'properties': {
        'task': {
          'type': 'string'
        },
        'assignee': {
          'type': 'string'
        },
        'status': {
          'type': 'string'
        }
      }
    },
    'InvalidResponse': {
      'type': 'object',
      'properties': {
        'statusCode': {
          'type': 'string'
        },
        'message': {
          'type': 'string'
        }
      }
    }
  }
}

dotenv.config()
const PORT = process.env.PORT || 5000
export const app = express()

const customCss = fs.readFileSync(process.cwd() + '/swagger.css', 'utf8')

app.use(express.json())
app.use(cookieParser())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagger, { customCss }))
app.use(cors())
app.use('/api', router)
app.use(Middleware)

export async function appStart() {
  try {
    await mongoose.connect(process.env.DB_URL)
    app.listen(PORT, () => console.log(`serverStarted on PORT: ${PORT}`))
  } catch (e) {
    console.log(e)
  }
}
appStart()
