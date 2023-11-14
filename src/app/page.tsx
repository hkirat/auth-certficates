'use client'

import { useForm, SubmitHandler } from 'react-hook-form'
import { z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'
import { getCertificateZSchema } from '@/utils/zSchema/CertificateValidations'
import { useState } from 'react'
import { OneCertificate } from '@/utils/types/Certificate'
import { toast } from 'react-toastify'
import { formatDateTime } from '@/utils/helpers/dates'
import Link from 'next/link'
import { NormalButton } from '@/components/Button/NormalButton'
import ShareCertificateButtons from '@/components/ShareCertificate/ShareCertificate'
import { apiLoadCertificateWithNumer } from '@/apiCalls/certificatesApi'

type GetCertificateType = z.infer<typeof getCertificateZSchema>

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isValidating },
    reset,
  } = useForm<GetCertificateType>({
    resolver: zodResolver(getCertificateZSchema),
  })

  const [certificateDetails, setCertificateDetails] = useState<OneCertificate>()
  const [loadingCertificate, setLoadingCertificate] = useState(false)

  const onSubmit: SubmitHandler<GetCertificateType> = async (data) => {
    try {
      setLoadingCertificate(true)
      const certificate = await apiLoadCertificateWithNumer(
        data?.certificateNumber
      )
      setCertificateDetails(certificate)
      reset()
    } catch (error: any) {
      console.error(error)

      const errorData = error?.response?.data?.message

      toast.error(
        typeof errorData === 'string'
          ? errorData
          : 'Enter Valid Data. Something unexpted in backend'
      )
    } finally {
      setLoadingCertificate(false)
    }
  }

  return (
    <main className="page_main flex_center flex-col">
      <section className="flex_center page_main flex-col text-center h-full">
        <div className="mb-8">
          <h1 className="text_highlight_gradient text_heading_size mb-8">
            100xDevs Cohort 1 Certificates
          </h1>

          <p className="text-xl max-w-6xl">
            Greetings, Cohort 1 members of 100xDevs! Your certificates are now
            available for access. Feel free to either generate new certificates
            or verify existing ones.
          </p>
        </div>
        <div className="flex gap-4">
          <Link href={'/generate'}>
            <NormalButton>Generate</NormalButton>
          </Link>
          <Link href={'/verify'}>
            <NormalButton>Verify</NormalButton>
          </Link>
        </div>
      </section>
    </main>
  )
}
